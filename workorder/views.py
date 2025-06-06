from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='/')
def workorder(request):
    return render(request, 'c_workorder.html')

@login_required(login_url='/')
def workorder_list(request):
    # Esta función mostrará el listado de órdenes de trabajo
    return render(request, 'c_workorder.html')  # Por ahora usamos la misma plantilla

@login_required(login_url='/')
def workorder_create(request):
    # Esta función mostrará el formulario para crear una nueva orden de trabajo
    return render(request, 'c_workorder.html')  # Por ahora usamos la misma plantilla