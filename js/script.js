let url = 'http://localhost:8080/contacts/';

window.onload = getAllContacts();

/* EVENT LISTENERS */
document.getElementById('load').addEventListener('click', function () {
  getAllContacts();
});

document.getElementById('new').addEventListener('click', function () {
  openAddModal();
});

document.getElementById('close').addEventListener('click', function () {
  closeAddModal();
});

document.getElementById('add-btn').addEventListener('click', function () {
  addNewContact();
});

/* MODAL FUNCTIONS */
/* ADD CONTACT */
function openAddModal() {
  document.getElementById('create-modal').style.display = 'inline';
  document.getElementById('main').classList.add('blur');
  document.getElementById('footer').classList.add('blur');
}
function closeAddModal() {
  document.getElementById('create-modal').style.display = 'none';
  document.getElementById('main').classList.remove('blur');
  document.getElementById('footer').classList.remove('blur');
}
/* DELETE CONTACT */
function openDeleteModal(id) {
  document.getElementById('modal' + id).style.display = 'flex';
  document.getElementById('yes' + id).style.pointerEvents = 'all';
  document.getElementById('no' + id).style.pointerEvents = 'all';
}
function closeDeleteModal(id) {
  document.getElementById('modal' + id).style.display = 'none';
  document.getElementById('yes' + id).style.pointerEvents = 'none';
  document.getElementById('no' + id).style.pointerEvents = 'none';
  clearForm();
}
/* UPDATE CONTACT */
function openUpdateModal(id) {
  console.log(id);

  gender = document.getElementById('gender' + id).innerText;
  console.log(gender);
  if (gender == 'male') {
    document.getElementById('update-male').checked = true;
  } else if (gender == 'female') {
    document.getElementById('update-female').checked = true;
  }

  document.getElementById('update-modal').style.display = 'inline';
  document.getElementById('main').classList.add('blur');
  document.getElementById('footer').classList.add('blur');

  document.getElementById('update-id').innerText = id;
  document.getElementById('update-firstName').value = document.getElementById(
    'firstName' + id
  ).innerText;
  document.getElementById('update-lastName').value = document.getElementById(
    'lastName' + id
  ).innerText;
  document.getElementById('update-address').value = document.getElementById(
    'address' + id
  ).innerText;
  document.getElementById('update-zipCode').value = document.getElementById(
    'zipCode' + id
  ).innerText;
  document.getElementById('update-city').value = document.getElementById(
    'city' + id
  ).innerText;
  document.getElementById('update-phoneNumber').value = document.getElementById(
    'phoneNumber' + id
  ).innerText;
  document.getElementById('update-email').value = document.getElementById(
    'email' + id
  ).innerText;
  document.getElementById('update-birthday').value = document.getElementById(
    'birthday' + id
  ).innerText;
}
function closeUpdateModal() {
  document.getElementById('update-modal').style.display = 'none';
  document.getElementById('main').classList.remove('blur');
  document.getElementById('footer').classList.remove('blur');
  clearUpdateForm();
}

/* --GET-- LOAD ALL CONTACTS */
function getAllContacts() {
  var source = document.getElementById('contact-body').innerHTML;
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      let body = '';
      data.forEach((element) => {
        var bodyTemplate = Handlebars.compile(source);
        body += bodyTemplate(element);
      });
      document.getElementById('contact-display').innerHTML = body;
    });
}
/* --POST-- ADD NEW CONTACT */
function addNewContact() {
  let gender = '';

  let checkbox = document.querySelector('input[type="checkbox"]:checked');
  if (!checkbox) {
    gender = 'no_gender';
  } else {
    gender = checkbox.value;
  }

  console.log(gender);

  let newContact = {
    gender: gender,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    zipCode: document.getElementById('zipCode').value,
    city: document.getElementById('city').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    email: document.getElementById('email').value,
    birthday: document.getElementById('birthday').value,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(newContact),
    headers: { 'content-type': 'application/json' },
  })
    .then(function () {
      getAllContacts();
      clearForm();
      closeAddModal();
    })
    .catch(function (err) {
      alert('Etwas ist schief gelaufen!\n' + err);
    });
}
/* --DELETE-- REMOVE CONTACT */
function deleteContact(id) {
  fetch(url + id, {
    method: 'DELETE',
  });

  var element = document.getElementById('contact' + id);
  element.parentNode.removeChild(element);
}
/* --PUT-- UPDATE CONTACT */
function updateContact() {
  let gender = '';

  let checkbox = document.querySelector('input[type="checkbox"]:checked');
  if (!checkbox) {
    gender = 'no_gender';
  } else {
    gender = checkbox.value;
  }

  id = document.getElementById('update-id').innerText;
  let newContact = {
    gender: gender,
    firstName: document.getElementById('update-firstName').value,
    lastName: document.getElementById('update-lastName').value,
    address: document.getElementById('update-address').value,
    zipCode: document.getElementById('update-zipCode').value,
    city: document.getElementById('update-city').value,
    phoneNumber: document.getElementById('update-phoneNumber').value,
    email: document.getElementById('update-email').value,
    birthday: document.getElementById('update-birthday').value,
  };
  fetch(url + id, {
    method: 'PUT',
    body: JSON.stringify(newContact),
    headers: { 'content-type': 'application/json' },
  })
    .then(function () {
      getAllContacts();
      clearUpdateForm();
      closeUpdateModal();
    })
    .catch(function (err) {
      alert('Etwas ist schief gelaufen!\n' + err);
    });
}

/* CLEAR FORMS IN MODAL AFTER SUBMITING DATA*/
function clearForm() {
  document.getElementById('male').checked = false;
  document.getElementById('female').checked = false;
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('address').value = '';
  document.getElementById('zipCode').value = '';
  document.getElementById('city').value = '';
  document.getElementById('phoneNumber').value = '';
  document.getElementById('email').value = '';
  document.getElementById('birthday').value = '';
}
function clearUpdateForm() {
  document.getElementById('update-male').checked = false;
  document.getElementById('update-female').checked = false;
  document.getElementById('update-firstName').value = '';
  document.getElementById('update-lastName').value = '';
  document.getElementById('update-address').value = '';
  document.getElementById('update-zipCode').value = '';
  document.getElementById('update-city').value = '';
  document.getElementById('update-phoneNumber').value = '';
  document.getElementById('update-email').value = '';
  document.getElementById('update-birthday').value = '';
}
/* ONLY ONE GENDER-CHECKBOX CAN BE CHECKED */
$(document).ready(function () {
  $('input:checkbox').click(function () {
    $('input:checkbox').not(this).prop('checked', false);
  });
});
/* ANIMATION FOR CONTACT ACCORDION*/
function collapse(id) {
  var acc = document.getElementById(id);

  var panel = acc.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    acc.classList.remove('active');
    /* closeModal(id); */
  } else {
    acc.classList.add('active');
    panel.style.maxHeight = '200px';
  }
}
