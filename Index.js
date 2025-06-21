fetch(`/api/user-wins?user_id=${user.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('wins').textContent = `Wins: ${data.wins}`;
  });