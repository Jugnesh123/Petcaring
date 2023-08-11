@extends("org-layout")
@section("title", "Login")
@section('alert')
    @error("email")
        <x-alert :message="$message"/>
    @enderror
@endsection
@section('body')
    <form action="/user/login" method="post">
        @csrf
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingEmail" placeholder="nano@email.com " name="email">
            <label for="floatingEmail">Email address</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password">
            <label for="floatingPassword">Password</label>
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
@endsection