from django.http import JsonResponse
from django.db.models import Count
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Package,Repos
import json


@api_view(['GET'])
def proxy_package_json(request, username, repository):
    try:
        url = f'https://raw.githubusercontent.com/{username}/{repository}/master/package.json'
        response = requests.get(url)
        response.raise_for_status()
        return Response(response.json())
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@csrf_exempt
def save_packages(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            packages = data.get('packageList', [])
            for package_name in packages:
                package, created = Package.objects.get_or_create(name=package_name)
                if not created:
                    package.increment_count()
            return JsonResponse({'message': 'Packages saved successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_top_packages(request):
    top_packages = Package.objects.order_by('-count')[:10]
    data = [{'name': package.name, 'count': package.count} for package in top_packages]
    return JsonResponse(data, safe=False)

def get_all_repos(request):
    repos = Repos.objects.all()
    data = [{'name': repo.name} for repo in repos]
    return JsonResponse(data, safe=False)

@csrf_exempt
def add_repo(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            if name:
                repo = Repos.objects.create(name=name)
                return JsonResponse({'id': repo.id, 'name': repo.name}, status=201)
            else:
                return JsonResponse({'error': 'Name field is required'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
