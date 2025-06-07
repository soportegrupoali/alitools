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
    # Obtener datos del proyecto de la sesión si existen
    project_data = request.session.get('project_data', None)
    
    # Eliminar los datos de la sesión para evitar que se usen en futuras órdenes
    # a menos que se reciban nuevamente desde el dashboard
    if 'project_data' in request.session:
        del request.session['project_data']
    
    context = {
        'project_data': project_data,
    }
    
    # Esta función mostrará el formulario para crear una nueva orden de trabajo
    return render(request, 'c_workorder.html', context)