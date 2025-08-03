const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');

// Load saved jobs
let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

function saveJobsToStorage() {
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

function renderJobs() {
  jobList.innerHTML = '';

  if (jobs.length === 0) {
    jobList.innerHTML = '<p>No jobs saved yet.</p>';
    return;
  }

  jobs.forEach((job, index) => {
    const div = document.createElement('div');
    div.className = `job ${job.status === 'Applied' ? 'applied' : ''}`;

    div.innerHTML = `
      <strong>${job.jobTitle}</strong> at <em>${job.company}</em><br>
      <a href="${job.link}" target="_blank">Open Job Link</a><br>
      <small>Source: ${job.source}</small><br>
      <small>Notes: ${job.notes}</small><br>
      <small>Status: ${job.status}</small><br>
      <small>Date Added: ${job.dateAdded}</small>
      <div class="actions">
        <button onclick="markApplied(${index})">✅ Mark Applied</button>
        <button onclick="deleteJob(${index})">❌ Delete</button>
      </div>
    `;

    jobList.appendChild(div);
  });
}

function markApplied(index) {
  jobs[index].status = 'Applied';
  saveJobsToStorage();
  renderJobs();
}

function deleteJob(index) {
  if (confirm('Are you sure you want to delete this job?')) {
    jobs.splice(index, 1);
    saveJobsToStorage();
    renderJobs();
  }
}

jobForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const job = {
    jobTitle: document.getElementById('jobTitle').value,
    company: document.getElementById('company').value,
    link: document.getElementById('link').value,
    source: document.getElementById('source').value,
    notes: document.getElementById('notes').value,
    status: 'Pending',
    dateAdded: new Date().toISOString().split('T')[0] // Auto date
  };

  jobs.push(job);
  saveJobsToStorage();
  renderJobs();
  jobForm.reset();
});

renderJobs();
