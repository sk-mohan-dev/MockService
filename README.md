# MockService

Minimal Node.js mock service for the crickviz match APIs used by the Android app.

## Endpoints

- `GET /match/fixtures`
- `GET /match/results`
- `GET /match/live_scores`

Convenience aliases are also available:

- `GET /fixtures`
- `GET /results`
- `GET /live_score`
- `GET /live_scores`

## Data source

By default the service reads raw JSON files from:

`/Users/selvakumar.mohan/VSCode/BCCI/Fixtures-Results/test-sim2`

You can override that with `MOCK_DATA_DIR`.

## Run

```bash
cd /Users/selvakumar.mohan/VSCode/MockService
npm start
```

Optional environment variables:

```bash
PORT=3000
MOCK_DATA_DIR=/Users/selvakumar.mohan/VSCode/BCCI/Fixtures-Results/test-sim2
```

## Notes

- The service reads the JSON file fresh on every request, so updating the raw files does not require a restart.
- `live_scores` uses `live_score_in.json` when the request has zero or one `comp_id` value, and `live_score_poll.json` when multiple `comp_id` values are provided.
