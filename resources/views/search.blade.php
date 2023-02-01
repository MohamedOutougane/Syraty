<form action="{{ Request::url() }}" method="get">
    <div class="form-group">
        <input type="text" name="search" class="form-control" placeholder="Rechercher par titre">
    </div>
    <div class="form-group">
        <label for="start_date">Date de début :</label>
        <input type="date" name="start_date" id="start_date">
    </div>
    <div class="form-group">
        <label for="end_date">Date de fin :</label>
        <input type="date" name="end_date" id="end_date">
    </div>
    <div class="form-group">
        <label for="rating">Note :</label>
        <select name="rating" id="rating">
        <option value="">Toutes les notes</option>
        @foreach ($ratings as $rating)
            <option value="{{ $rating->id }}">{{ $rating->name }}</option>
        @endforeach
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Rechercher</button>
</form>