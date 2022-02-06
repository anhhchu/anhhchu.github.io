// Add Custom Elements to reuse Menu Html template across pages
class Menu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <!-- Menu -->
    <nav id="menu">
        <div class="inner">
          <h2>Menu</h2>
          <ul class="links">
            <li><a href="index.html">About Me</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="courses.html">Courses & Awards</a></li>
            <li><a href="testimonials.html">Testimonials</a></li>
          </ul>
          <a href="#" class="close">Close</a>
        </div>
    </nav>
    `;
  }
}
customElements.define('my-menu', Menu);

class CopyRight extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <ul class="copyright">
      <li>&copy; Made with 💕&🧋</li>
      <li> 
        <a href="https://wakatime.com/badge/github/anhhchu/anhhchu.github.io"><img src="https://wakatime.com/badge/github/anhhchu/anhhchu.github.io.svg" alt="wakatime"></a>
      </li>
    </ul>
    `;
  }
}
customElements.define('my-copyright', CopyRight);

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);