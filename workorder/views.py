from django.shortcuts import render

# Create your views here.
def workorder(request):
    return render(request, 'c_workorder.html')