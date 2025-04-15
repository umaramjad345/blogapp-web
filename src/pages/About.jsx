const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-justify p-4 my-4 text-teal-600 dark:text-teal-200">
        <h1 className="text-3xl font font-semibold text-center my-8">About</h1>
        <div className="text-md flex flex-col gap-6">
          <p>
            Welcome! This website was created by Umar Amjad as a personal
            project to share his thoughts and ideas with the world. Umar is a
            passionate developer who also loves to write on topics such as
            Technology, Web Development, Career Development, Personal Finance
            and many more.
          </p>

          <p>
            So, Umar decided to develop this platform. At this platform, we
            provide you engaging and informative content across a wide range of
            categories. Whether you're passionate about exploring the latest in
            technology, discovering new destinations through travel, or seeking
            advice on managing your personal finances, we've got you covered.
          </p>

          <p>
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. We believe that a community of learners can help each
            other grow and improve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
