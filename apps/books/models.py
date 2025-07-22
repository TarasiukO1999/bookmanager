from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Book(models.Model):
    title = models.CharField(null=False, blank=False, max_length=100)
    image = models.ImageField(null=True, blank=True, max_length=200, upload_to="upload/imgs/books")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=True)
    desc = models.TextField(default="")
    slug = models.SlugField(unique=True, max_length=255, null=False, blank=True)

    class Meta:
        app_label = 'books'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            # Ensure the slug is unique
            original_slug = self.slug
            count = 1
            while Book.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{count}"
                count += 1
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
