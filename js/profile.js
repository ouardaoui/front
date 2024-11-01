function updateProfilePicture(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

function handleProfilePage() {
    document.getElementById('profileForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        currentPassword: document.getElementById('currentPassword').value,
        newPassword: document.getElementById('newPassword').value
      };
    
      console.log('Form submitted:', formData);
      alert('Profile updated successfully!');
    });
}