from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
# Create your views here.


@api_view(['POST'])
def user_register(request):
    email = request.data.get('email')
    user1 = User.objects.filter(email=email)
    user = UserSerializers(data = request.data)
    if user.is_valid():
        user.save()
        return Response({'message':'Register Successfull'},status=200)
    elif user1:
        return Response({'message':'User already register'},status=400)
    else:
        return Response({'message':'Register Unsuccessfull'},status=400)

@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email, password=password)
        return Response({'message':'Login Successfull', 'userID':user.id, 'userName':user.userName},status=200)
    except:
        return Response({'message':'Invalid Credentilas'},status=400)