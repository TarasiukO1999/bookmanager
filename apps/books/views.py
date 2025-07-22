from django.shortcuts import render
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication

from books.models import Book
from .serializers import BooksSerializer

# Create your views here.
class BooksPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    page_query_param = "page"
    max_page_size = 100


class BooksListViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, viewsets.GenericViewSet):
    pagination_class = BooksPagination
    queryset = Book.objects.all()
    serializer_class = BooksSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('title', 'desc')
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    lookup_field = 'slug'

    def get_queryset(self):
        # Filter books based on the current user (owner)
        print(self.request.user)
        return Book.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        # Set the owner of the book to the current user during creation
        serializer.save(owner=self.request.user)