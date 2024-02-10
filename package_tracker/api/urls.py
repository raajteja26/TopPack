from django.urls import path
from .views import top_packages

urlpatterns = [
    path('top-packages/', top_packages, name='top_packages'),
]
