'use strict';

/**
 * Module pattern
 */

const MainController = (function () {

    // Constructor
    constructor: {
        var $users        = $('.app-users'),
            $newUserBtn   = $('.app-new-user'),
            $deleteAllBtn = $('.app-delete-all'),
            $user         = $('.app-user');

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
    function addEventsToUser() {
        $user
            .find('.app-delete').click(deleteUser).end()
            .find('.app-clone').click(cloneUser);

        // Set attr selected on change select element
        $user.find('select').change(function () {
            $(this)
                .find('option[value="' + this.value + '"]')
                .attr("selected", "selected");
        });

        // Set attr selected on change select element
        $user.find('input[type="radio"]').click(function () {
            $(this).attr("checked", "checked");
            $(this).siblings('input[type="radio"]').removeAttr("checked");
        });
    }

    // Clone user empty
    function cloneUserEmpty() {
        var $newUser = $userTemplate.clone(true).hide();
        $users.append($newUser);
        $newUser.slideDown();
        reindex();
    }

    // Delete All Users
    function deleteAll(e) {
        e.preventDefault();

        $users.empty();
    }

    // Delete User
    function deleteUser(e) {
        e.preventDefault();

        var $user = $(e.target).parents('.app-user');

        $user.fadeOut(null, null, () => {
            $user.remove()
        });
    }

    // Clone User
    function cloneUser(e) {
        e.preventDefault();
        var $userToClone = $(e.target).parents('.app-user'),
            $newUser = $userToClone.clone(true).hide();

        $userToClone.after($newUser);
        $newUser.slideDown();
        reindex();
    }

    // Rename ids
    function reindex() {
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

    // Public data
    return {
        version: 1
    }
}());
