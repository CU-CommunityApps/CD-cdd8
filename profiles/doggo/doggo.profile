<?php

/**
 * @file
 * Enables modules and site configuration for a doggo site installation.
 */

use Drupal\contact\Entity\ContactForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter() for install_configure_form().
 *
 * Allows the profile to alter the site configuration form.
 */
function doggo_form_install_configure_form_alter(&$form, FormStateInterface $form_state) {
  // Pre-populate the site name and email address.
  $form['site_information']['site_name']['#default_value'] = 'CU Bear Cub';
  $form['site_information']['site_mail']['#default_value'] = 'cd-drupal-l@list.cornell.edu';

  // Account information defaults
  $form['admin_account']['account']['name']['#default_value'] = 'admin';
  $form['admin_account']['account']['mail']['#default_value'] = 'cd-drupal-l@list.cornell.edu';

  // Date/time settings
  $form['regional_settings']['site_default_country']['#default_value'] = 'US';
  $form['regional_settings']['date_default_timezone']['#default_value'] = 'America/New_York';

  $form['#submit'][] = 'doggo_form_install_configure_submit';
}

/**
 * Submission handler to sync the contact.form.feedback recipient.
 */
function doggo_form_install_configure_submit($form, FormStateInterface $form_state) {
  $site_mail = $form_state->getValue('site_mail');
  ContactForm::load('feedback')->setRecipients([$site_mail])->trustData()->save();
}
