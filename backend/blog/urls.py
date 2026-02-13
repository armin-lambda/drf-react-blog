from django.urls import path

from . import views


app_name = 'blog'
urlpatterns = [
    path('', views.PostListAPIView.as_view(), name='post-list'),
    path('<slug:slug>/', views.PostDetailAPIView.as_view(), name='post-detail'),
]
