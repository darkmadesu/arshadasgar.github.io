$(function() {

    var basket = $('#basket'),
        container = $('#container'),
        hen = $('.hen'),
        eggs = $('.egg'),
        egg1 = $('#egg1'),
        egg2 = $('#egg2'),
        egg3 = $('#egg3'),
        restart = $('#restart'),
        basket_width = basket.width(),
        basket_height = basket.height(),
        hen_height = hen.height(),
        container_height = container.height(),
        egg_height = eggs.height(),
        egg_initial_position = parseInt(eggs.css('top')),
        score_span = $('#score'),
        life_span = $('#life'),
        score = 0,
        life = 20,
        counter = 0,
        score_updated = false,
        the_game, anim_id, egg_current_position;

    life_span.text(life);

    the_game = function() {
        counter++;
        // Eggs down
        if (counter > 10)
            egg_down(egg1);
        if (counter > 80)
            egg_down(egg2);
        if (counter > 30)
            egg_down(egg3);

        //Check eggs fall in basket
        if (check_catch(egg1)) {
            update_score(egg1);
        }
        if (check_catch(egg2)) {
            update_score(egg2);
        }
        if (check_catch(egg3)) {
            update_score(egg3);
        }
        //Check eggs has gone out of the container
        if (parseInt(egg1.css('top')) >= container_height - egg_height) {
            set_egg_to_initial_position(egg1);
        }
        if (parseInt(egg2.css('top')) >= container_height - egg_height) {
            set_egg_to_initial_position(egg2);
        }
        if (parseInt(egg3.css('top')) >= container_height - egg_height) {
            set_egg_to_initial_position(egg3);
        }

        if (life) {
            anim_id = requestAnimationFrame(the_game);
        } else {
            stop_the_game();
        }
    };

    anim_id = requestAnimationFrame(the_game);

    $(document).mousemove(function(e) {
        basket.css('left', e.pageX - basket_width / 2);
    });

    restart.click(function() {
        location.reload();
    });

    function egg_down(egg) {
        egg_current_position = parseInt(egg.css('top'));
        egg.css('top', egg_current_position + 3);
    }

    function check_catch(egg) {
        if (collision(egg, basket) && (parseInt(egg.css('top')) >= parseInt(container_height - basket_height - egg_height)) && (parseInt(egg.css('top')) <= parseInt(container_height - basket_height)))
            return true
        return false;
    }

    function update_score(egg) {
        set_egg_to_initial_position(egg, false);
        score = score + 1;
        score_span.text(score);
        if (score % 5 === 0)
            life = life + 1;
    }

    function set_egg_to_initial_position(egg, update_life_flag = true) {
        if (update_life_flag) {
            update_life();
        }
        egg.css('top', egg_initial_position);
    }

    function update_life() {
        life = life - 1;
        if (life < 0) {
            life = 0;
        } else {
            life_span.text(life);
        }
    }

    function stop_the_game() {
        cancelAnimationFrame(anim_id);
        $('#restart').slideDown();
    }
});
