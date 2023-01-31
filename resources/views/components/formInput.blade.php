<div class="form-group">
    @if ($type != 'checkbox')
        <label for="{{ $name }}">
            {{ $title }}
        </label>
    @elseif ($type == 'file')
        <label for="inputImage">
            {{ $title }}
        </label>
    @else 
        public ?
    @endif
    @if($type == 'textarea')
        <textarea name="{{ $name }}" id="{{ $name }}" cols="30" rows="10" class="form-control @error($name) is-invalid @enderror">{{ $value }}</textarea>
    @elseif ($type == 'select')
        <select name="{{ $name }}" id="{{ $name }}" class="form-control @error($name) is-invalid @enderror">
            @foreach ($options as $option)
                <option value="{{ $option->id }}">
                    {{ $option->name }}
                </option>
            @endforeach
        </select>
    @elseif ($type == 'checkbox')
        <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" class="@error($name) is-invalid @enderror">
    @elseif ($type == 'file')
        <input type="{{ $type }}" name="{{ $name }}" id="inputImage" class="form-control-file @error($name) is-invalid @enderror">
    @else
        <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" class="form-control @error($name) is-invalid @enderror" value="{{ $value }}">
    @endif
</div>

@error($name)
    <div class="alert alert-danger">{{ $message }}</div>
@enderror