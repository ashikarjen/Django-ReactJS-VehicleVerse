from rest_framework import generics
from django.shortcuts import render, redirect
from .models import Vehicle, Rental
from .serializers import VehicleSerializer, RentalSerializer
from .forms import CreateUserForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .serializers import UserSerializer
from django.contrib.auth.models import Group


class VehicleListCreateView(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class VehicleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class RentalListCreateView(generics.ListCreateAPIView):
    queryset = Rental.objects.filter(is_available=True)
    serializer_class = RentalSerializer


class RentalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer


class VehicleListView(generics.ListAPIView):
    serializer_class = VehicleSerializer
    def get_queryset(self):
        queryset = Vehicle.objects.all()

        # Get the 'vehicle_type' query parameter
        vehicle_type = self.request.query_params.get('vehicle_type', None)

        # Filter the queryset based on the 'vehicle_type'
        if vehicle_type:
            queryset = queryset.filter(vehicle_type=vehicle_type)

        return queryset


class RentalListView(generics.ListAPIView):
    serializer_class = RentalSerializer
    def get_queryset(self):
        queryset = Rental.objects.all()

        # Get the 'vehicle_type' query parameter
        vehicle_type = self.request.query_params.get('vehicle_type', None)

        # Filter the queryset based on the 'vehicle_type'
        if vehicle_type:
            queryset = queryset.filter(vehicle_type=vehicle_type)

        return queryset


class CurrentUserAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


def registration(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()

            # Adding the user to the 'customer' group
            customer_group = Group.objects.get(name='customer')
            user.groups.add(customer_group)

            # Marking the user as staff
            user.is_staff = True
            user.save()

            messages.success(request, 'Account was created for ' + user.username)
            return redirect('/login/')
        else:
            print(form.errors)

    context = {'form': form}
    return render(request, 'reg.html', context)
     


def loginPage(request):
    
    if request.method=="POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            url = f'http://localhost:3000/{username}'
            return redirect(url)
        else:
            messages.info(request, 'Invalid Username Or Password')
            context = {}
            return render(request, 'login.html', context)
    
    context = {}

    return render(request, 'login.html', context)


def logoutUser(request):
    logout(request)
    return redirect('/login')