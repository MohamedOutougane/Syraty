<div class="form-group">
    <label for="{{ $name }}">
        {{ $title }}
    </label>
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
    @else
        <input type="{{ $type }}" name="{{ $name }}" id="{{ $name }}" class="form-control" value="{{ $value }}">
    @endif
</div>