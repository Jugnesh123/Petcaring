@extends("org-layout")
@section("title", "Login")
@section('alert')
    @error("message")
        <x-alert :message="$message"/>
    @enderror
@endsection
@section('body')
    <form action="/user/register" method="post" enctype="multipart/form-data">
        @csrf
        <div class="form-floating mb-3">
            <input class="form-control" accept="image/*" type="file" id="formFile" name="profile" placeholder="photo">
            <label for="formFile" class="form-label">Profile</label>
        </div>
        <div class="form-floating mb-3">
            <input type=    "text" class="form-control" id="floatingName" placeholder="name" name="bussinessname">
            <label for="floatingName">Bussiness Name</label>
        </div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingPhone" placeholder="phone" name="phone">
            <label for="floatingPhone">Phone</label>
        </div>
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="nano@email.com " name="email">
            <label for="floatingEmail">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password">
            <label for="floatingPassword">Password</label>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
@endsection