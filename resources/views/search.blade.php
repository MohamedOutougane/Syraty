<form class="searchForm" action="{{ Request::url() }}" method="get">
    <div class="form-group">
        <label for="start_date">Que recherchez vous?</label>
        <input type="text" name="search" class="form-control" placeholder="Mes vacances en Italie">
    </div>
    <div class="form-group">
        <label for="start_date">Date de début :</label>
        <input type="date" class="form-control" name="start_date" id="start_date">
    </div>
    <div class="form-group">
        <label for="end_date">Date de fin :</label>
        <input type="date" class="form-control" name="end_date" id="end_date">
    </div>
    <div class="form-group">
        <label for="rating">Ce jour était</label>
        <select name="rating" id="rating" class="form-control">
        <option value="">Toutes les notes</option>
        @foreach ($ratings as $rating)
            <option value="{{ $rating->id }}">{{ $rating->name }}</option>
        @endforeach
        </select>
    </div>
    <button type="submit" class="search-button">Rechercher</button>
</form>