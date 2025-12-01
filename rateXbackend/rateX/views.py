from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
# Create your views here.


# Generate manual JWT token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



@api_view(['POST'])
def user_register(request):
    email = request.data.get('email')
    user1 = User.objects.filter(email=email)
    user = UserSerializers(data = request.data)
    if user.is_valid():
        new_user=user.save()
        token = get_tokens_for_user(new_user)
        return Response({'message':'Register Successfull', "token":token},status=200)
    elif user1:
        return Response({'message':'User already register'},status=400)
    else:
        return Response({'message':'Register Unsuccessfull'},status=400)

@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = authenticate(request, email=email, password=password)
        token = get_tokens_for_user(user)
        return Response({'message':'Login Successfull', 'userID':user.id, 'userName':user.userName, 'token':token},status=200)
    except:
        return Response({'message':'Invalid Credentilas'},status=400)
