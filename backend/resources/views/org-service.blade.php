@extends("org-layout")
@section("title", "Hello")
@section('body')
  <div class="table-responsive rounded p-5">
    <table class="table table-striped-columns table-hover caption-top">
      <caption>{{$name}}  <a href="/service/add" class="btn btn-primary">Add</a></caption>
      <thead class="table-dark">
        <tr>
          @foreach($tablenames as $tablename)
          <th scope="col">{{$tablename->column_name}}</th>
          @endforeach
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        @forelse($tables as $table)
        <tr>
          @foreach($tablenames as $tablename)
          @if($tablename->column_name == "id")
          <th scope="row">{{$table['id']}}</th>
          @else
          <td scope="row">{{$table[$tablename->column_name] ?? "Null"}}</td>
          @endif
          @endforeach
          <td scope="row"><a href="/service/delete/{{$table['id']}}" class="btn btn-danger">Delete</a></td>
        </tr>
        @empty
        <div id="liveToast" class="toast position-absolute bg-danger" style="bottom: 5%; right: 5%;" role="alert"
          aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <strong class="me-auto">Notifactions</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body text-light">
            No Data
          </div>
        </div>
        <script>
          const toastLiveExample = document.getElementById('liveToast')
          window.addEventListener('load', () => {
            const toast = new bootstrap.Toast(toastLiveExample)

            toast.show()
          })
        </script>
        @endforelse
      </tbody>
    </table>
  </div>
  <script>
    document.getElementById("section-body").classList.remove("m-5");
    document.getElementById("section-body").style.height = "calc(100vh - 100px)";
  </script>

  @endsection