from django.urls import  include,path
from .views import proxy_package_json,save_packages,get_top_packages, get_all_repos, add_repo

urlpatterns = [
    path('proxy/<str:username>/<str:repository>/', proxy_package_json, name='proxy_package_json'),
    path('save_packages/', save_packages,name="save_packages"),
    path('top_packages/', get_top_packages, name='top_packages'),
    path('repos/', get_all_repos, name='get_all_repos'),
    path('repos/add/', add_repo, name='add_repo'),
]



