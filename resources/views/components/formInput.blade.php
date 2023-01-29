<div class="form-group">
    @if ($type != 'checkbox')
        <label for="{{ $name }}">
            {{ $title }}
        </label>
    @else 
        public ?
    @endif
    @if($type == 'textarea')
        <textarea name="{{ $name }}" id="{{ $name }}" cols="30" rows="10" class="form-control">
            {{ $value }}
        </textarea>
    @elseif ($type == 'select')
        <select name="{{ $name }}" id="{{ $name }}" class="form-control">
            @foreach ($options as $option)
                <option value="{{ $option->id }}">
                    {{ $option->name }}
                </option>
            @endforeach
        </select>
    @elseif ($type == 'checkbox')
        <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" value="{{ $value }}">
    @elseif ($type == 'file')
        <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" class="form-control-file">
    @else
        <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" class="form-control" value="{{ $value }}">
    @endif
</div>