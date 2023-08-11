@extends("layout")
@section("body")
    @foreach($tables as $table)
        <x-databasedetail  :name="$table->table_name" :create="$table->create_time" :update="$table->update_time" :length="$table->table_rows"/>
    @endforeach
@endsection