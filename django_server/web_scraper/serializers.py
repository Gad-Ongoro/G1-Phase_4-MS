from rest_framework import serializers

class WebScraperSerializer(serializers.Serializer):
    name = serializers.CharField()