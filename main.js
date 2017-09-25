'use strict';

// Main module definition
const MainController = (function () {
    
    // Constructor
    constructor: {
        // Variables / properties
        var $user         = $('.user'),
            $userTemplate = $user.clone(),
            $users        = $('.users'),
            $newUserBtn   = $('.new-user');
        
        // Add events
        addInitEvents();
    }
    
    // Add init events
    function addInitEvents() {
        $newUserBtn.click(cloneUserEmpty);
        addEventsToUser($user);
    }
    
    // Add events to user
    function addEventsToUser($user){
        $user
            .find('.delete').click(deleteUser).end()
            .find('.clone').click(cloneUser);
        
        // Set attr selected on change select element
        $user.find('select').change(function(){
            $(this)
                .find('option[value="'+this.value+'"]')
                .attr("selected", "selected");
        });
    }
    
    // Clone user empty
    function cloneUserEmpty() {
        var $newUser = $userTemplate.clone().hide();
        $users.append($newUser);
        $newUser.slideDown();
        addEventsToUser($newUser);
    }
    
    // Delete User
    function deleteUser(e) {
        e.preventDefault();
        
        var $user = $(e.target).parents('.user');
        
        $user
            .prepend('<h5>Deleting...</h5>')
            .slideUp( null, null, () => {$user.remove()});
    }   
    
    // Clone User
    function cloneUser(e) {
        e.preventDefault();
        var $userToClone = $(e.target).parents('.user'),
            $newUser = $userToClone.clone(true).hide();
        
        $userToClone.after($newUser);
        $newUser.slideDown();
    }
    
    return {
        version: 1
    }
}());
