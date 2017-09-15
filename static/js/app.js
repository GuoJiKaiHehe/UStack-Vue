$('.sidebar-nav-sub-title').on('click', function() {
  //查找这个a元素所有类名为sidebar-nav-sub的元素
  console.log('加载了3')
  $(this).siblings('.sidebar-nav-sub').slideToggle(80)

    .end()
    .find('.sidebar-nav-sub-ico').toggleClass('sidebar-nav-sub-ico-rotate');
})
