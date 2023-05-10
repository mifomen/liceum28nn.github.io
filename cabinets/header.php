<?php global $wp_locale;
if (isset($wp_locale)) {
	$wp_locale->text_direction = 'ltr';
} ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset') ?>" />
<title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
<!-- Created by Artisteer v4.1.0.60046 -->
<meta name="viewport" content="initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no, width = device-width">
<meta name="yandex-verification" content="4b56d5e11e81d6ad" />
<!--[if lt IE 9]><script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-164515653-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-164515653-1');
</script>

<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(62212564, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/62212564" style="position:absolute; left:-9999px;" alt="" /></div></noscript>


<link rel="stylesheet" href="<?php bloginfo('stylesheet_url') ?>" media="screen" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php
remove_action('wp_head', 'wp_generator');
if (is_singular() && get_option('thread_comments')) {
	wp_enqueue_script('comment-reply');
}
wp_head();
?>
 <link rel="stylesheet" href="/wp-content/themes/UNN-liceum28/JetBrains.css?v=202007231"/>
 <link rel="preload" href="/wp-content/themes/UNN-liceum28/flex-style.css?v=202007231" as="style">
 <link rel="stylesheet" href="/wp-content/themes/UNN-liceum28/flex-style.css?v=202007231"/>
</head>
<body  <?php body_class(); ?>>

<div id="art-main">

 <div class="header-msg vh" style="display: none;" id="div1"> test #2</div>

<?php if(theme_has_layout_part("header")) : ?>
<header class="art-header<?php echo (theme_get_option('theme_header_clickable') ? ' clickable' : ''); ?>"><?php get_sidebar('header'); ?></header>
<?php endif; ?>

<div class="art-sheet clearfix">
<nav class="art-nav">
    <?php
	echo theme_get_menu(array(
			'source' => theme_get_option('theme_menu_source'),
			'depth' => theme_get_option('theme_menu_depth'),
			'menu' => 'primary-menu',
			'class' => 'art-hmenu'
		)
	);
	get_sidebar('nav');
?>
    </nav>
<div   style="background-color: #fff; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAABlBMVEX///+pqalTpKl9AAAAAnRSTlMAGovxNEIAAAAdSURBVDjLY2AAAUaG4UYxDDsfjfp91O+jfqfE7wCzpQCw/dq+qQAAAABJRU5ErkJggg==');" class="art-layout-wrapper">
                <div class="art-content-layout">
                    <div class="art-content-layout-row">
                        <?php get_sidebar(); ?>
                        <div class="art-layout-cell art-content">
