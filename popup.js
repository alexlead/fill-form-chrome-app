document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('userForm');
  const clearBtn = document.getElementById('clearBtn');
  const copyButtons = document.querySelectorAll('.copy-btn');

  loadFormData();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    saveFormData();
  });

  clearBtn.addEventListener('click', function () {
    clearFormData();
  });

  copyButtons.forEach(button => {
    button.addEventListener('click', function () {
      const fieldName = this.getAttribute('data-field');
      const fieldValue = document.getElementById(fieldName).value;

      if (fieldValue) {
        navigator.clipboard.writeText(fieldValue)
          .then(() => {
            const btnImage = this.querySelector('img');
            const originalSrc = btnImage.src;
            btnImage.src = '/icons/bootstrap/emoji-sunglasses-fill.svg';
            setTimeout(() => {
              btnImage.src = originalSrc;
            }, 2000);
          })
          .catch(err => {
            console.error('Copy error: ', err);
          });
      }
    });
  });

  function loadFormData() {
    chrome.storage.local.get(['userData'], function (result) {
      if (result.userData) {
        document.getElementById('lastName').value = result.userData.lastName || '';
        document.getElementById('firstName').value = result.userData.firstName || '';
        document.getElementById('email').value = result.userData.email || '';
        document.getElementById('phone').value = result.userData.phone || '';
        document.getElementById('linkedin').value = result.userData.linkedin || '';
        document.getElementById('xing').value = result.userData.xing || '';
        document.getElementById('github').value = result.userData.github || '';
        document.getElementById('other').value = result.userData.other || '';
      }
    });
  }

  function saveFormData() {
    const userData = {
      lastName: document.getElementById('lastName').value,
      firstName: document.getElementById('firstName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      linkedin: document.getElementById('linkedin').value,
      xing: document.getElementById('xing').value,
      github: document.getElementById('github').value,
      other: document.getElementById('other').value,
    };

    chrome.storage.local.set({ userData: userData }, function () {
      const saveBtnImage = document.getElementById('saveBtn').querySelector('img');
      const originalSrc = saveBtnImage.src;

      saveBtnImage.src = '/icons/bootstrap/floppy-fill.svg';
      setTimeout(() => {
        saveBtnImage.src = originalSrc;
      }, 2000);
    });
  }

  function clearFormData() {
    document.getElementById('lastName').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('linkedin').value = '';
    document.getElementById('xing').value = '';
    document.getElementById('github').value = '';
    document.getElementById('other').value = '';

    chrome.storage.local.remove(['userData'], function () {
      const clearBtnImage = document.getElementById('clearBtn').querySelector('img');
      const originalSrc = clearBtnImage.src;
      clearBtnImage.src = '/icons/bootstrap/trash.svg';
      setTimeout(() => {
        clearBtnImage.src = originalSrc;
      }, 2000);
    });
  }
});