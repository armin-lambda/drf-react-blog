from rest_framework import serializers

from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'body', 'created_at', 'updated_at']
    
    def get_body(self, obj):
        return f"{obj.body[:200]}..." if len(obj.body) > 20 else obj.body


class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'body', 'created_at', 'updated_at']
