from django.urls import path, include

from rest_framework.routers import DefaultRouter
from apps.books.views import BooksListViewSet

router = DefaultRouter()
router.register(r'', BooksListViewSet, basename='books')

urlpatterns = [
    path('', include(router.urls))
]