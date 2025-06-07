from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Project
from django.contrib import messages

# Create your views here.
@login_required(login_url='/')
def dashboard(request):
    # Datos de ejemplo para el dashboard
    stats = {
        'completed_orders': 12,
        'pending_orders': 5,
        'approved_payments': 8,
        'pending_payments': 3
    }
    
    # Procesar el formulario de nuevo proyecto
    if request.method == 'POST':
        name = request.POST.get('project_name')
        description = request.POST.get('project_description')
        provider = request.POST.get('project_provider')
        cost = request.POST.get('project_cost')
        
        # Guardar el proyecto en la base de datos
        project = Project.objects.create(
            name=name,
            description=description,
            provider=provider,
            cost=cost
        )
        
        # Guardar los datos del proyecto en la sesión para usar en workorder
        request.session['project_data'] = {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'provider': project.provider,
            'cost': str(project.cost)
        }
        
        messages.success(request, "Proyecto creado correctamente. Continúe con la orden de trabajo.")
        return redirect('workorder:create')
    
    # Enviar los datos al template
    return render(request, 'dashboard.html', {
        'stats': stats
    })