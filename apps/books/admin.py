from django.contrib import admin
from .models import Book

# Register your models here.
class BookAdmin(object):
    list_display = ["title", "image", "owner"]

admin.site.register(Book)