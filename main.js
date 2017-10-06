'use strict';

// Main module definition
const MainController = (function () {
    
    // Constructor
    constructor: {
        var $users        = $('.users'),
            $newUserBtn   = $('.new-user'),
            $deleteAllBtn = $('.delete-all'),
            $user         = $('.user');
        
        // Add events
        addEvents();
        
        // Clone initial template
        var $userTemplate = $user.clone(true);
    }
    
    // Add init events
    function addEvents() {
        $newUserBtn.click(cloneUserEmpty);
        $deleteAllBtn.click(deleteAll);
        addEventsToUser();
    }
    
    // Add events to user
    function addEventsToUser(){
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
        var $newUser = $userTemplate.clone(true).hide();
        $users.append($newUser);
        $newUser.slideDown();
    }
    
     // Delete All Users
    function deleteAll(e) {
        e.preventDefault();
        
        $users.empty();
    }  
    
    // Delete User
    function deleteUser(e) {
        e.preventDefault();
        
        var $user = $(e.target).parents('.user');
        
        $user.fadeOut( null, null, () => {$user.remove()});
    }   
    
    // Clone User
    function cloneUser(e) {
        e.preventDefault();
        var $userToClone = $(e.target).parents('.user'),
            $newUser = $userToClone.clone(true).hide();
        
        $userToClone.after($newUser);
        $newUser.slideDown();
    }
    
    // Public data
    return {
        version: 1
    }
}());
