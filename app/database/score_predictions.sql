CREATE OR REPLACE FUNCTION score_predictions(
  p_movie_id text,
  p_prediction_type text,
  p_actual_value numeric
)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN

  UPDATE movie_predictions mp
  SET
    actual_value = p_actual_value,

    accuracy =
      GREATEST(
        0,
        ROUND(
          (
            100 -
            (
              ABS(mp.predicted_value - p_actual_value)
              / p_actual_value * 100
            )
          )::numeric,
          2
        )
      ),

    points =
    (
      -- Base Championship Points
      CASE
        WHEN mp.prediction_type = 'opening_day' THEN
          CASE
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) = 100 THEN 100
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 95 THEN 95
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 90 THEN 85
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 85 THEN 70
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 80 THEN 50
            ELSE 0
          END

        WHEN mp.prediction_type = 'lifetime' THEN
          CASE
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) = 100 THEN 150
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 95 THEN 140
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 90 THEN 125
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 85 THEN 105
            WHEN (100 - (ABS(mp.predicted_value - p_actual_value) / p_actual_value * 100)) >= 80 THEN 80
            ELSE 0
          END

        ELSE 0
      END

      +

      -- Early prediction bonus
      COALESCE(
        (
          SELECT CASE
            WHEN (m.release_date::date - mp.created_at::date)
                 BETWEEN 15 AND 20 THEN 20

            WHEN (m.release_date::date - mp.created_at::date)
                 BETWEEN 7 AND 14 THEN 15

            ELSE 0
          END
          FROM movies m
          WHERE m.movie_id = mp.movie_id
          LIMIT 1
        ),
        0
      )

    ),

    status = 'scored',
    scored_at = NOW()

  WHERE mp.movie_id = p_movie_id
    AND mp.prediction_type = p_prediction_type;

END;
$function$;