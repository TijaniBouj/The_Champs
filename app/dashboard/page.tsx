import BlockedTableForm from '@/components/blocked-topics'
import ChartTwo from '@/components/chart'
import NotificationsSection from '@/components/notifications-section'
import UploadProgressForm from '@/components/progress'
import Stats from '@/components/stats'
import TimeLimiter from '@/components/time-limiter'
import Warning from '@/components/warning'

export default function Page() {
  return (
    <div>
      <div className="mt-4 px-4 md:px-20">
        <Warning
          title="Topic: Bullying"
          description="Your child talked about bullying. It's important to address this issue promptly."
        />
      </div>
      <Stats />
      <div>
        <div className="mt-4 px-4 md:px-20">
          <div className=" md:px-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white ">
              Parental Control
            </h2>
            <p className="text-gray-500 dark:text-gray-400 pr-36">
              Our parental control feature empowers you to create a safe and
              controlled environment for your child while using{' '}
              <span className="font-bold">Beemo</span>. This section provides
              you with comprehensive tools to customize and monitor your
              child&apos;s interactions, ensuring they benefit from a positive
              and productive experience.
            </p>
            <hr className="dark:border-gray-600 mt-4" />
          </div>
        </div>
        <div className="mt-4 px-4 md:px-20 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
          <BlockedTableForm />
          <ChartTwo />
        </div>
      </div>
      <div className="mt-4 px-4 md:px-20">
        <div className=" md:px-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ">
            Weekly Progress
          </h2>
          <p className="text-gray-500 dark:text-gray-400 pr-36">
            This section provides you with detailed insights into your
            child&apos;s weekly progress. It provides you with insights into
            your child&apos;s key interactions, allowing you to monitor their
            progress and identify areas for improvement.
          </p>
          <hr className="dark:border-gray-600 mt-4" />
        </div>
      </div>
      <div className="mt-4 px-4 md:px-20 py-4">
        <div className="md:px-6">
          <UploadProgressForm />
        </div>
      </div>
      <div className="mt-4 px-4 md:px-20">
        <div className=" md:px-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white ">
            Settings
          </h2>
          <p className="text-gray-500 dark:text-gray-400 pr-36">
            Customize <span className="font-bold">Beemo</span> notifications,
            voice, and interaction style. Choose a warm, female voice with a
            casual response style in English. Receive behavioral alerts for
            specific child behaviors, ensuring personalized and timely
            notifications. Fine-tune settings for a tailored experience.
          </p>
          <hr className="dark:border-gray-600 mt-4" />
        </div>
      </div>
      <div className="mt-4 px-4 md:px-20">
        <div className="md:px-6">
          <NotificationsSection />
        </div>
      </div>
    </div>
  )
}
