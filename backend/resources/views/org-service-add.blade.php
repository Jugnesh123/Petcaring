@extends("org-layout")
@section("title", "Login")
@section('alert')
    @error("message")
        <x-alert :message="$message"/>
    @enderror
@endsection
@section('body')
    <form action="/service/add" method="post" enctype="multipart/form-data">
        @csrf
        <div class="form-floating mb-3">
            <input class="form-control" accept="image/*" type="file" id="formFile" name="profile" placeholder="photo">
            <label for="formFile" class="form-label">Profile</label>
        </div>

        <div class="form-floating mb-3">
            <input class="form-control" type="number" min="0" id="formprice" name="price" placeholder="price">
            <label for="formprice" class="form-label">Price</label>
        </div>
        <div class="mb-3">
            <select class="form-select" aria-label="Default select example" name="service">
                @foreach($service as $s)
                    <option value="{{$s->id}}">{{$s->name}}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
                <select class="form-select" aria-label="Default select example" name="breed">
                @foreach($breed as $b)
                    <option value="{{$b->id}}">{{$b->name}}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-3">
            <select class="form-select" aria-label="Default select example" name="perday">
                <option value="1">Day</option>
                <option value="0">Hour</option>
            </select>
        </div>
        <div class="mb-3">
            <textarea class="form-control" name="description" rows="3" id="formdescription" placeholder="Description"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
@endsection