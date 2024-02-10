from django.http import JsonResponse
from django.db.models import Count
from .models import Repository

def top_packages(request):
    top_packages = Repository.objects.values('package_name').annotate(repository_count=Count('id')).order_by('-repository_count')[:10]
    top_packages_data = list(top_packages.values('package_name', 'repository_count'))
    return JsonResponse(top_packages_data, safe=False)

