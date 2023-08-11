<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="">PetCaring</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/service">Service</a>
                </li>
            </ul>
            <div class="d-flex mx-1 my-2 ">
                <a href="/register" class="btn btn-primary me-2">
                    Register
                </a>    
                @if(Auth::check())
                <a href="/user/logout" class="btn btn-primary">
                    Sign Out
                </a>    
                @else
                <a href="/login" class="btn btn-primary">
                    Sign In
                </a>
                @endif
            </div>
        </div>
    </div>
</nav>