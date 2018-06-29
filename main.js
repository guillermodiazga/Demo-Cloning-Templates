'use strict';

/**
 * Class pattern
 */

new class MainController {

    // Constructor
    constructor() 
    {
        var self = this;

        self.$users        = $('.app-users'),
        self.$newUserBtn   = $('.app-new-user'),
        self.$deleteAllBtn = $('.app-delete-all'),
        self.$user         = $('.app-user');

        // Add events
        self.addEvents();

        // Clone initial template
        self.$userTemplate = self.$user.clone(true);
    }

    // Add init events
    addEvents() 
    {
        var self = this;

        self.$newUserBtn.click((e)=>{self.cloneUserEmpty(e)});
        self.$deleteAllBtn.click((e)=>{self.deleteAll(e)});
        self.addEventsToUser();
    }

    // Add events to user
    addEventsToUser() 
    {
        var self = this;

        self.$user
            .find('.app-delete').click((e)=>{self.deleteUser(e)}).end()
            .find('.app-clone').click((e)=>{self.cloneUser(e)});

        // Set attr selected on change select element
        self.$user.find('select').change(function () {
            $(this)
                .find('option[value="' + this.value + '"]')
                .attr("selected", "selected");
        });

        // Set attr selected on change select element
        self.$user.find('input[type="radio"]').click(function () {
            $(this).attr("checked", "checked");
            $(this).siblings('input[type="radio"]').removeAttr("checked");
        });
    }

    // Clone user empty
    cloneUserEmpty() {
        var self = this;

        var $newUser = self.$userTemplate.clone(true).hide();

        self.$users.append($newUser);

        $newUser.slideDown();

        self.reindex();
    }

    // Delete All Users
    deleteAll(e) {
        var self = this;

        e.preventDefault();

        self.$users.empty();
    }

    // Delete User
    deleteUser(e) {
        var self = this;

        e.preventDefault();

        var $user = $(e.target).parents('.app-user');

        $user.fadeOut(null, null, () => {
            $user.remove()
        });
    }

    // Clone User
    cloneUser(e) {
        var self = this;

        e.preventDefault();
        var $userToClone = $(e.target).parents('.app-user'),
            $newUser     = $userToClone.clone(true).hide();

        $userToClone.after($newUser);
        $newUser.slideDown();
        self.reindex();
    }

    // Rename ids
    reindex() {
        var self = this;

        $.each($('.user'), function (i, e) {
            var $e = $(e),
                index = $e.index();

            var $elementToReindex = $e.find('[id]');

            $.each($elementToReindex, function (i, e) {
                var $e = $(e);
                e.id = $e.data('id') + '-' + index;

                if ($e.next().attr('for')) {
                    $e.next().attr('for', e.id);
                }
            });
        });
    }
}();
