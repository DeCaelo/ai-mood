import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const NewUser = async () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Button>
        <span className="mr-2 inline-flex shrink-0 self-center animate-spin-slow">
          <Loader className="w-4" />
        </span>
        Loading
      </Button>
    </div>
  );
};

export default NewUser;