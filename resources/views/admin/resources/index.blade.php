@extends('layouts.app')
@section('content')
<div id="app"></div>
<script>
    window.vueConfig = {
        isAdminPage: true
    }
</script>
@endsection