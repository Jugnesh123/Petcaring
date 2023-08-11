<div class="card d-flex mb-3" style="cursor:pointer;" onclick="window.location.href='/admin/database/{{$name}}'">
  <div class="card-body d-flex align-items-center">
    <p class="card-text">{{$name ?? ''}}</p>
    <div class="ms-auto">
      <p class="card-text">Total Rows: {{$length ?? '0'}}</p>
      <p class="card-text">Create time: {{$create ?? 'Null'}}</p>
      <p class="card-text">Update time: {{$update ?? 'Null'}}</p>
    </div>
  </div>
</div>