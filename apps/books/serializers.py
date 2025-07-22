from rest_framework import serializers
from books.models import Book


class BooksSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        # fields = ('category', 'goods_sn', 'name', 'click_num', 'sold_num', 'market_price')
        fields = "__all__"