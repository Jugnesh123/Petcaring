@extends('layout')
@section('body')
<div class="table-responsive rounded">
<table class="table table-striped-columns table-hover caption-top">
    <caption>{{$name}}</caption>
  <thead class="table-dark">
    <tr>
        @foreach($tablenames as $tablename)
        <th scope="col">{{$tablename->column_name}}</th>
        @endforeach
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
        </tr>
        @empty
<div id="liveToast" class="toast position-absolute bg-danger" style="bottom: 5%; right: 5%;" role="alert" aria-live="assertive" aria-atomic="true">
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
<div class="d-flex mt-1">
    @if($back != null)
    <a class="btn btn-primary" href="/admin/database/{{$name}}/{{$back}}">Back</a>
    @endif
    @if($next != null)
      <a class="btn btn-primary ms-auto" href="/admin/database/{{$name}}/{{$next}}">Next</a>
    @endif
</div>
@endsection