console.log('Welcome to Atomic NFTs!')

function codeaddress() {
    document.getElementsByClassName('sidebar-about')[0].addEventListener('click', function () {
        if ( document.getElementsByClassName('sidebar-nav')[0] && document.getElementsByClassName('sidebar-nav')[0].className && !document.getElementsByClassName('sidebar-nav')[0].className.includes('hidden') ) {
            document.getElementsByClassName('sidebar-nav')[0].className += " hidden"
           } else { 
            document.getElementsByClassName('sidebar-nav')[0].className = document.getElementsByClassName('sidebar-nav')[0].className.split('hidden').join('');  
           }
        
      })
}
