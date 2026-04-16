<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <link rel="preload" as="image" href="{{ Vite::asset('resources/images/background.jpg') }}" fetchpriority="high">
        <link rel="preload" as="image" href="{{ Vite::asset('resources/images/header.jpg') }}" fetchpriority="high">
        <link rel="preload" as="image" href="{{ Vite::asset('resources/images/header-text.png') }}">
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
